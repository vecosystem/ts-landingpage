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

    const response = await notion.pages.create({
      parent: {
        type: 'database_id',
        database_id: '20d2d37cca11808b94e5ff4d79a2eb49',
      },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: name,
              },
            },
          ],
        },
        Email: {
          email: email,
        },
      },
    });

    return { success: true, data: response };
  } catch (error) {
    console.error('Error adding user to Notion:', error);
    return { success: false, error };
  }
} 