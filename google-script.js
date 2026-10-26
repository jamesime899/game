/**
 * ==========================================================================================
 * โค้ด Google Apps Script สำหรับเชื่อมต่อเกม "ผจญภัยโลกกระดูกมหัศจรรย์"
 * Google Sheet ID: 1MaT7ui18SbEBmvvRvHhP-ECM-DGncDXEjQr13xqbZmc
 * ==========================================================================================
 * 
 * 📌 ขั้นตอนการติดตั้งง่าย ๆ ภายใน 2 นาที:
 * 1. เปิด Google Sheets ของคุณ: 
 *    https://docs.google.com/spreadsheets/d/1MaT7ui18SbEBmvvRvHhP-ECM-DGncDXEjQr13xqbZmc/edit
 * 2. ไปที่เมนูด้านบน คลิก "ส่วนขยาย" (Extensions) > "Apps Script"
 * 3. ลบโค้ดเดิมทั้งหมดออก แล้ววาง (Paste) โค้ดทั้งหมดในไฟล์นี้ลงไป
 * 4. กดปุ่มบันทึก 💾 (รูปแผ่นดิสก์)
 * 5. กดปุ่ม "ทำให้ใช้งานได้" (Deploy) มุมขวาบน > เลือก "การทำให้ใช้งานได้รายการใหม่" (New deployment)
 * 6. ตรงรูปเฟืองเลือกประเภท: "เว็บแอป" (Web app)
 * 7. ตั้งค่าการเข้าถึง:
 *    - คำอธิบาย: บันทึกคะแนนเกมกระดูก ป.3
 *    - ดำเนินการในฐานะ: "ฉัน" (Me)
 *    - ผู้ที่มีสิทธิ์เข้าถึง: "ทุกคน" (Anyone) **สำคัญมาก ต้องเลือก Anyone**
 * 8. กดปุ่ม "ทำให้ใช้งานได้" (Deploy) และกดอนุญาตสิทธิ์ (Authorize access)
 * 9. คัดลอก "URL ของเว็บแอป" (Web app URL) ที่ลงท้ายด้วย /exec
 * 10. นำ URL นั้นมากรอกในหน้าเว็บเกมตรงเมนู 📖 (คู่มือครู) หรือใส่ในตัวแปร DEFAULT_GAS_URL
 * ==========================================================================================
 */

const SPREADSHEET_ID = "1MaT7ui18SbEBmvvRvHhP-ECM-DGncDXEjQr13xqbZmc";
const SHEET_NAME = "ผลการเล่น";

function getOrCreateTargetSheet() {
  let ss;
  try {
    ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  } catch (e) {
    // หากไม่ได้เปิดด้วย ID ให้เปิด active sheet แทน
    ss = SpreadsheetApp.getActiveSpreadsheet();
  }

  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    
    // สร้างหัวตารางสวยงามอัตโนมัติ
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

    // ตกแต่งหัวตารางให้อ่านง่าย
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground("#0284c7");
    headerRange.setFontColor("#ffffff");
    headerRange.setFontWeight("bold");
    headerRange.setFontFamily("Sarabun");
    headerRange.setHorizontalAlignment("center");
    
    sheet.setFrozenRows(1);
    sheet.setColumnWidth(1, 170); // วันที่/เวลา
    sheet.setColumnWidth(2, 220); // ชื่อนักเรียน
    sheet.setColumnWidth(3, 100); // คะแนน
    sheet.setColumnWidth(4, 130); // ถูก
    sheet.setColumnWidth(5, 150); // ตอบผิด
    sheet.setColumnWidth(6, 120); // เวลา
    sheet.setColumnWidth(7, 260); // ผลการเล่น
  }

  return sheet;
}

// รับข้อมูลจากตัวเกม (POST Request)
function doPost(e) {
  try {
    let data;
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else if (e.parameter) {
      data = e.parameter;
    } else {
      throw new Error("No data received");
    }

    const sheet = getOrCreateTargetSheet();

    // บันทึกแถวข้อมูลใหม่
    sheet.appendRow([
      data.timestamp || new Date().toLocaleString("th-TH"),
      data.studentName || "ไม่ระบุชื่อ",
      data.score !== undefined ? data.score : 0,
      data.correctCount || "7/7 ข้อ",
      data.wrongCount !== undefined ? data.wrongCount : 0,
      data.timeTaken || "-",
      data.result || "-"
    ]);

    // จัดตำแหน่งกึ่งกลางของคะแนนและเวลา
    const lastRow = sheet.getLastRow();
    sheet.getRange(lastRow, 3, 1, 4).setHorizontalAlignment("center");

    return ContentService
      .createTextOutput(JSON.stringify({ status: "success", message: "บันทึกข้อมูลเรียบร้อยแล้ว" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ตรวจสอบสถานะการทำงานผ่าน Browser (GET Request)
function doGet(e) {
  return ContentService
    .createTextOutput("ระบบบันทึกผลการเล่นเกม 'ผจญภัยโลกกระดูกมหัศจรรย์' พร้อมใช้งาน 100%")
    .setMimeType(ContentService.MimeType.TEXT);
}
