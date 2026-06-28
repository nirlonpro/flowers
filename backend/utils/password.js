import bcrypt from "bcrypt";

const password = "Nirlon"; // Change this to your real password

const generateHash = async () => {
  const hash = await bcrypt.hash(password, 12);

  console.log("\n==============================");
  console.log("Your Password:");
  console.log(password);
  console.log("\nBcrypt Hash:");
  console.log(hash);
  console.log("==============================");
};

generateHash();