// app/api/download/route.ts

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const fileUrl = searchParams.get('fileUrl');

  if (!fileUrl) {
    return new NextResponse('File URL is required', { status: 400 });
  }

  try {
    // Fetch the file from the Sanity CDN
    const response = await fetch(fileUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch file: ${response.statusText}`);
    }

    // Get the file name from the URL
    const filename = fileUrl.split('/').pop() || 'download.pdf';

    // Create a new response to send to the client
    return new NextResponse(response.body, {
      headers: {
        // This header tells the browser to download the file
        'Content-Disposition': `attachment; filename="${filename}"`,
        // Set the content type from the original file response
        'Content-Type': response.headers.get('Content-Type') || 'application/pdf',
      },
    });
  } catch (error) {
    console.error('Download error:', error);
    return new NextResponse('Error downloading file', { status: 500 });
  }
}