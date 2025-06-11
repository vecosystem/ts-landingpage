'use server';

import { Client } from '@notionhq/client';

if (!process.env.NOTION_API_KEY || !process.env.NOTION_DATABASE_ID) {
  throw new Error(
    'Missing required environment variables NOTION_API_KEY or NOTION_DATABASE_ID',
  );
}

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export async function submitToNotion(formData: FormData) {
  try {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;

    if (!name || !email) {
      throw new Error('이름과 이메일은 필수 입력 항목입니다.');
    }

    console.log('Attempting to create page in Notion database...');
    console.log('Database ID:', process.env.NOTION_DATABASE_ID);
    
    const response = await notion.pages.create({
      parent: {
        type: 'database_id',
        database_id: process.env.NOTION_DATABASE_ID || '',
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
    return { success: false, error };
  }
} 