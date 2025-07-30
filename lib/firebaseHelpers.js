// Firebase database helper functions
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';

/**
 * Retrieves user's college data from Firestore
 * @param {string} phone - The user's phone number
 * @returns {Promise<Object>} - Object containing collegeOrder and notes
 */
export async function getUserCollegeData(phone) {
  try {
    if (!phone) return { collegeOrder: [], notes: {} };
    
    const docRef = doc(db, "userCollegeData", phone);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return { collegeOrder: [], notes: {} };
    }
  } catch (error) {
    console.error("Error getting user college data:", error);
    return { collegeOrder: [], notes: {}, error: error.message };
  }
}

/**
 * Saves user's college data to Firestore
 * @param {string} phone - The user's phone number
 * @param {Array} collegeOrder - Array of college IDs in order of preference
 * @param {Object} notes - Object mapping college IDs to array of notes/facts
 * @returns {Promise<Object>} - Result of the operation
 */
export async function saveUserCollegeData(phone, collegeOrder, notes) {
  try {
    if (!phone) return { success: false, error: "No phone number provided" };
    
    const docRef = doc(db, "userCollegeData", phone);
    const docSnap = await getDoc(docRef);
    
    // Prepare data to save
    const data = {
      collegeOrder: Array.isArray(collegeOrder) ? collegeOrder : [],
      notes: typeof notes === 'object' && notes !== null ? notes : {}
    };
    
    // If document exists, update it; otherwise create it
    if (docSnap.exists()) {
      await updateDoc(docRef, data);
    } else {
      await setDoc(docRef, data);
    }
    
    return { success: true };
  } catch (error) {
    console.error("Error saving user college data:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Updates the college order for a user
 * @param {string} phone - The user's phone number
 * @param {Array} collegeOrder - Array of college IDs in order of preference
 * @returns {Promise<Object>} - Result of the operation
 */
export async function updateCollegeOrder(phone, collegeOrder) {
  try {
    if (!phone) return { success: false, error: "No phone number provided" };
    if (!Array.isArray(collegeOrder)) return { success: false, error: "College order must be an array" };
    
    const docRef = doc(db, "userCollegeData", phone);
    const docSnap = await getDoc(docRef);
    
    // If document exists, update only the collegeOrder field
    if (docSnap.exists()) {
      await updateDoc(docRef, { collegeOrder });
    } else {
      // Create new document with college order and empty notes
      await setDoc(docRef, { collegeOrder, notes: {} });
    }
    
    return { success: true };
  } catch (error) {
    console.error("Error updating college order:", error);
    return { success: false, error: error.message };
  }
}

/**
 * Adds a fact/USP for a specific college
 * @param {string} phone - The user's phone number
 * @param {string} collegeId - ID of the college
 * @param {string} fact - The fact/USP to add
 * @returns {Promise<Object>} - Result of the operation
 */
export async function addCollegeFact(phone, collegeId, fact) {
  try {
    if (!phone) return { success: false, error: "No phone number provided" };
    if (!collegeId) return { success: false, error: "No college ID provided" };
    if (!fact) return { success: false, error: "No fact provided" };
    
    const docRef = doc(db, "userCollegeData", phone);
    const docSnap = await getDoc(docRef);
    
    let notes = {};
    
    if (docSnap.exists()) {
      // Get existing notes or initialize empty object
      notes = docSnap.data().notes || {};
    }
    
    // Initialize college notes array if it doesn't exist
    if (!notes[collegeId]) {
      notes[collegeId] = [];
    }
    
    // Add the new fact
    notes[collegeId].push(fact);
    
    // Update document with new notes
    if (docSnap.exists()) {
      await updateDoc(docRef, { notes });
    } else {
      // Create new document with empty college order and the new note
      await setDoc(docRef, { collegeOrder: [], notes });
    }
    
    return { success: true };
  } catch (error) {
    console.error("Error adding college fact:", error);
    return { success: false, error: error.message };
  }
}
