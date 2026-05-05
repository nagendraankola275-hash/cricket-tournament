const fs = require("fs");
const path = require("path");

const folder = path.join(__dirname, "public/players");

const players = [
  "Ramprasad Shetti",
  "Sachin M Shetti",
  "Nagaraj Ankola",
  "Ramanath Digambar Hosmane",
  "Girish Ramesh Shetti",
  "Nikhil Gullapur",
  "Prasad Kakarmath",
  "Praveen Shetti",
  "Prajwal C Shetti",
  "Nitish Shetti",
  "Sujay S",
  "Nikhil Shetti",
  "Dinesh Shetti",
  "Prasad Shetti",
  "Neelakantha Gullapur",
  "Darshan Shetti",
  "Chetan Prakash Vaidya",
  "Sanket Shetti",
  "Rajat R Prasad",
  "Vinayak P Balehittal",
  "Prajat Shetti",
  "Abhishek Shetti",
  "Ashwin Shetti",
  "Adithya Shetti",
  "Milind Gaonkar",
  "Harsha Shetty",
  "Santosh Kale",
  "Siddharth Shetti",
  "Amogh Banare",
  "Milan Ankola",
  "Chandan R Shetti",
  "Supraj Gaonkar",
  "Kartik Shetti",
  "Sarvesh K Shetti",
  "Uday Shetti",
  "Nachiket Shetti",
  "Chetan M Bandikatte",
  "Kiran Shetti",
  "Vishwas Balehittal",
  "Nilesh Shetti",
  "Santhosh Shetti",
  "Roshan Shetti",
  "Neel P Nagarkatte",
  "Mahesh Vinayak Shetti",
  "Karthik R Shetti",
  "Shridhar Gokarna",
  "Vaibhav Gullapur",
  "Vishnunag Shetti",
  "Nagendra G Ankola",
  "Vijay Shetti",
  "Vinayak Shetti",
];

// strict format
const format = (name) =>
  name.toLowerCase().replace(/\s+/g, "_") + ".jpg";

const files = fs.readdirSync(folder);

players.forEach((player) => {
  const correctName = format(player);

  // already exists → skip
  if (files.includes(correctName)) {
    console.log(`⏭️ Skipped (already correct): ${correctName}`);
    return;
  }

  // try to find exact FIRST+LAST match only
  const [first, , last] = player.toLowerCase().split(" ");

  const match = files.find((file) => {
    return file.includes(first) && file.includes(last);
  });

  if (!match) {
    console.log(`❌ Not found: ${player}`);
    return;
  }

  const oldPath = path.join(folder, match);
  const newPath = path.join(folder, correctName);

  try {
    fs.renameSync(oldPath, newPath);
    console.log(`✅ ${match} → ${correctName}`);
  } catch (err) {
    console.log(`⚠️ Skipped (error): ${match}`);
  }
});