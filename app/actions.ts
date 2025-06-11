'use server';

import { Client } from '@notionhq/client';

// 환경 변수 검증
const notionApiKey = process.env.NOTION_API_KEY;
const notionDatabaseId = process.env.NOTION_DATABASE_ID;

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
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;

    if (!name || !email) {
      return { success: false, error: '이름과 이메일은 필수 입력 항목입니다.' };
    }

    console.log('Attempting to create page in Notion database...');
    console.log('Database ID:', notionDatabaseId);
    
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

    console.log('Successfully created page:', response);
    return { success: true, data: response };
  } catch (error: any) {
    console.error('Detailed error information:', {
      message: error?.message,
      code: error?.code,
      status: error?.status,
      body: error?.body
    });
    
    // 사용자 친화적인 에러 메시지 반환
    const errorMessage = error?.message || '알 수 없는 오류가 발생했습니다.';
    return { success: false, error: errorMessage };
  }
} 