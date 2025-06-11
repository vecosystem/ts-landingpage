'use server';

import { Client } from '@notionhq/client';

// 환경 변수 검증
const notionApiKey = process.env.NOTION_API_KEY;
const notionDatabaseId = process.env.NOTION_DATABASE_ID;

// 환경 변수 로깅 (민감한 정보는 마스킹)
console.log('Environment variables check:', {
  hasApiKey: !!notionApiKey,
  hasDatabaseId: !!notionDatabaseId,
  databaseIdLength: notionDatabaseId?.length
});

if (!notionApiKey || !notionDatabaseId) {
  console.error('Missing environment variables:', {
    hasApiKey: !!notionApiKey,
    hasDatabaseId: !!notionDatabaseId
  });
  throw new Error(
    'Missing required environment variables NOTION_API_KEY or NOTION_DATABASE_ID',
  );
}

// 타입 단언을 통해 undefined가 아님을 보장
const notion = new Client({
  auth: notionApiKey as string,
});

export async function submitToNotion(formData: FormData) {
  try {
    // FormData 로깅
    console.log('Received form data:', {
      hasName: formData.has('name'),
      hasEmail: formData.has('email')
    });

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;

    if (!name || !email) {
      console.error('Missing required fields:', { name, email });
      return { success: false, error: '이름과 이메일은 필수 입력 항목입니다.' };
    }

    // 입력값 검증
    if (name.length < 2) {
      console.error('Invalid name length:', { name, length: name.length });
      return { success: false, error: '이름은 2글자 이상이어야 합니다.' };
    }

    if (!email.includes('@')) {
      console.error('Invalid email format:', { email });
      return { success: false, error: '유효한 이메일 주소를 입력해주세요.' };
    }

    console.log('Attempting to create page in Notion database...', {
      databaseId: notionDatabaseId,
      name,
      email
    });
    
    try {
      const response = await notion.pages.create({
        parent: {
          type: 'database_id',
          database_id: notionDatabaseId as string,
        },
        properties: {
          이름: {
            title: [
              {
                text: {
                  content: name,
                },
              },
            ],
          },
          이메일: {
            email: email,
          },
        },
      });

      console.log('Successfully created page:', {
        id: response.id,
        object: response.object
      });
      
      return { success: true, data: response };
    } catch (notionError: any) {
      console.error('Notion API error:', {
        message: notionError?.message,
        code: notionError?.code,
        status: notionError?.status,
        body: notionError?.body,
        stack: notionError?.stack
      });

      // Notion API 관련 에러 메시지 처리
      if (notionError?.code === 'unauthorized') {
        return { success: false, error: 'Notion API 인증에 실패했습니다.' };
      }
      
      if (notionError?.code === 'object_not_found') {
        return { success: false, error: 'Notion 데이터베이스를 찾을 수 없습니다.' };
      }

      if (notionError?.status === 429) {
        return { success: false, error: '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.' };
      }

      return { success: false, error: notionError?.message || 'Notion API 호출 중 오류가 발생했습니다.' };
    }
  } catch (error: any) {
    console.error('Unexpected error:', {
      message: error?.message,
      code: error?.code,
      status: error?.status,
      body: error?.body,
      stack: error?.stack
    });
    
    return { success: false, error: '알 수 없는 오류가 발생했습니다.' };
  }
} 