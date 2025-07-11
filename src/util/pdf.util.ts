import { PDFDocument, rgb } from "pdf-lib";
import fs from 'fs';
import path from 'path';
import * as fontkit from 'fontkit';
import { Fontkit } from "pdf-lib/cjs/types/fontkit";

export async function generateInvoice(order: any) {
 const pdfDoc = await PDFDocument.create();
 const page = pdfDoc.addPage();
 const { height } = page.getSize();
 pdfDoc.registerFontkit(fontkit as unknown as Fontkit);

 const robotoBytes = fs.readFileSync(path.join(__dirname, '../fonts/Roboto-Regular.ttf'));
 const robotBoldBytes = fs.readFileSync(path.join(__dirname, '../fonts/Roboto-Bold.ttf'));
 const font = await pdfDoc.embedFont(robotoBytes);
 const fontBold = await pdfDoc.embedFont(robotBoldBytes);

 let y = height - 50;

 const drawText = (text: string, x:number, y:number, bold = false, size = 12) => {
   page.drawText(text, {
     x,
     y,
     size,
     font: bold ? fontBold : font,
     color: rgb(0, 0, 0),
   });
 };

 // Header
 drawText('INVOICE', 50, y, true, 20);
 y -= 30;

 drawText(`Invoice ID: ${order.id}`, 50, y);
 y -= 15;
 drawText(`Date: ${new Date(order.createdAt).toLocaleDateString()}`, 50, y);
 drawText(`Status: ${order.status}`, 350, y);
 y -= 30;

 // User Info
 drawText('Customer:', 50, y, true);
 y -= 15;
 drawText(`Name: ${order.user.name}`, 50, y);
 y -= 15;
 drawText(`Email: ${order.user.email}`, 50, y);
 y -= 15;
 drawText(`Address: ${order.user.address}`, 50, y);
 y -= 30;

 // Table Header
 drawText('Item', 50, y, true);
 drawText('Qty', 300, y, true);
 drawText('Price', 350, y, true);
 drawText('Total', 420, y, true);
 y -= 15;

 let grandTotal = 0;

 // Table Rows
 for (const item of order.orderItems) {
   const { quantity, product } = item;
   const total = quantity * product.price;
   grandTotal += total;

   drawText(product.name, 50, y);
   drawText(quantity.toString(), 300, y);
   drawText(`₹${product.price}`, 350, y);
   drawText(`₹${total}`, 420, y);
   y -= 15;
 }

 y -= 20;
 drawText(`Grand Total: ₹${grandTotal}`, 420, y, true);

 const pdfBytes = await pdfDoc.save();
 return Buffer.from(pdfBytes);
}