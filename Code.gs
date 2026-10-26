/**
 * ==============================================================================
 * โค้ด Google Apps Script (Code.gs)
 * สำหรับเกม "ผจญภัยโลกกระดูกมหัศจรรย์" (วิทยาศาสตร์ ป.3)
 * Google Sheet ID: 1MaT7ui18SbEBmvvRvHhP-ECM-DGncDXEjQr13xqbZmc
 * ==============================================================================
 */

// รหัส Google Sheet ของคุณครู
const SPREADSHEET_ID = "1MaT7ui18SbEBmvvRvHhP-ECM-DGncDXEjQr13xqbZmc";
// ชื่อแผ่นงานที่จะเก็บผลคะแนน
const SHEET_NAME = "ผลการเล่น";

/**
 * ฟังก์ชันสร้างหรือดึงแผ่นงาน พร้อมตั้งค่าหัวตารางอัตโนมัติ
 */
function getOrCreateTargetSheet() {
  let ss;
  try {
    ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  } catch (err) {
    // หากเปิดผ่าน ID ไม่ได้ ให้เปิดแผ่นงานที่กำลังเปิดอยู่อัตโนมัติ
    ss = SpreadsheetApp.getActiveSpreadsheet();
  }

  let sheet = ss.getSheetByName(SHEET_NAME);
  
  // ถ้ายังไม่มีแผ่นงาน ให้สร้างใหม่และใส่หัวตารางสวยงาม
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    
    // รายชื่อคอลัมน์ตามข้อกำหนด
    const headers = [
      "วันที่/เวลา",
      "ชื่อนักเรียน",
      "คะแนน",
      "จำนวนข้อที่ถูก",
      "จำนวนครั้งที่ตอบผิด",
      "เวลาที่ใช้",
      "ผลการเล่น"
    ];
    
    sheet.appendRow(headers);

    // ตกแต่งหัวตารางให้อ่านง่าย ชัดเจน
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground("#0284c7");       // สีฟ้าเข้มสดใส
    headerRange.setFontColor("#ffffff");       // ตัวหนังสือสีขาว
    headerRange.setFontWeight("bold");         // ตัวหนา
    headerRange.setFontSize(11);
    headerRange.setHorizontalAlignment("center");
    headerRange.setVerticalAlignment("middle");
    
    // ตรึงแถวที่ 1 ไว้
    sheet.setFrozenRows(1);
    sheet.setRowHeight(1, 36);

    // ปรับความกว้างคอลัมน์ให้เหมาะสมกับข้อความ
    sheet.setColumnWidth(1, 170); // วันที่/เวลา
    sheet.setColumnWidth(2, 220); // ชื่อนักเรียน
    sheet.setColumnWidth(3, 100); // คะแนน
    sheet.setColumnWidth(4, 140); // จำนวนข้อที่ถูก
    sheet.setColumnWidth(5, 150); // จำนวนครั้งที่ตอบผิด
    sheet.setColumnWidth(6, 120); // เวลาที่ใช้
    sheet.setColumnWidth(7, 260); // ผลการเล่น
  }

  return sheet;
}

/**
 * ฟังก์ชันรับข้อมูลคะแนนจากตัวเกม (POST Request)
 */
function doPost(e) {
  try {
    let data;
    
    // ตรวจสอบว่าส่งมาเป็น JSON หรือ Form Data
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else if (e.parameter) {
      data = e.parameter;
    } else {
      throw new Error("ไม่พบข้อมูลที่ส่งเข้ามา (No payload)");
    }

    const sheet = getOrCreateTargetSheet();

    // เพิ่มแถวข้อมูลใหม่
    sheet.appendRow([
      data.timestamp || new Date().toLocaleString("th-TH"),
      data.studentName || "ไม่ระบุชื่อ",
      data.score !== undefined ? data.score : 0,
      data.correctCount || "7/7 ข้อ",
      data.wrongCount !== undefined ? data.wrongCount : 0,
      data.timeTaken || "-",
      data.result || "-"
    ]);

    // จัดข้อความให้อยู่กึ่งกลางในคอลัมน์ตัวเลขและเวลา
    const lastRow = sheet.getLastRow();
    sheet.getRange(lastRow, 1, 1, 1).setHorizontalAlignment("center");
    sheet.getRange(lastRow, 3, 1, 4).setHorizontalAlignment("center");
    sheet.setRowHeight(lastRow, 28);

    // ส่งผลลัพธ์ตอบกลับสำเร็จ (พร้อม CORS Header)
    return ContentService
      .createTextOutput(JSON.stringify({ 
        status: "success", 
        message: "บันทึกผลคะแนนเรียบร้อยแล้ว" 
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ 
        status: "error", 
        message: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * ฟังก์ชันสำหรับทดสอบเปิดผ่าน Browser หรือตรวจสถานะ (GET Request)
 */
function doGet(e) {
  return ContentService
    .createTextOutput("ระบบบันทึกผลการเล่นเกม 'ผจญภัยโลกกระดูกมหัศจรรย์' กำลังทำงานปกติ 100%")
    .setMimeType(ContentService.MimeType.TEXT);
}
