import { NextResponse } from 'next/server';
import { client } from '@/lib/sanity'; // Adjust the import path as needed

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    // Basic validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Create a new document in Sanity
    await client.create({
      _type: 'contactSubmission',
      name,
      email,
      subject,
      message,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ message: 'Message submitted successfully' }, { status: 201 });

  } catch (error) {
    console.error('Error submitting form to Sanity:', error);
    return NextResponse.json({ message: 'Error submitting message' }, { status: 500 });
  }
}