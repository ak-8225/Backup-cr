// Firebase-based API route for user college data
import { NextRequest, NextResponse } from 'next/server';
import { getUserCollegeData, saveUserCollegeData } from '@/lib/firebaseHelpers';

export async function GET(req) {
  try {
    // Extract the phone number from the URL query params
    const { searchParams } = new URL(req.url);
    const phone = searchParams.get('phone');
    
    if (!phone) {
      return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
    }
    
    // Get user college data from Firebase
    const data = await getUserCollegeData(phone);
    
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in GET request:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { phone, collegeOrder, notes, likedColleges } = body;
    
    if (!phone) {
      return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
    }
    
    // Save data to Firebase
    const result = await saveUserCollegeData(phone, collegeOrder, notes, likedColleges);
    
    if (result.success) {
      return NextResponse.json({ message: "Data saved successfully" });
    } else {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }
  } catch (error) {
    console.error("Error in POST request:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
