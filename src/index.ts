import { PrismaClient } from "@prisma/client";
import { selectUser } from "@prisma/client/sql";

process.env.DATABASE_URL =
  "postgresql://sandbox:postgres@localhost:5432/sandbox?schema=public";

const prisma = new PrismaClient();

const main = async () => {
  // ユーザーの作成
  const newUser = await prisma.user.create({
    data: {
      name: "Alice",
      email: "alice@prisma.io",
    },
  });
  console.log("Created user:", newUser);

  // ユーザーの読み取り
  const allUsers = await prisma.user.findMany();
  console.log("All users:", allUsers);

  // ユーザーの更新
  const updatedUser = await prisma.user.update({
    where: { email: "alice@prisma.io" },
    data: { name: "Alice Wonderland" },
  });
  console.log("Updated user:", updatedUser);

  // TypedSQLによる取得
  const user = await prisma.$queryRawTyped(selectUser("Alice Wonderland"));

  console.log("Specify user(by TypedSQL):", user);

  // ユーザーの削除
  const deletedUser = await prisma.user.delete({
    where: { email: "alice@prisma.io" },
  });
  console.log("Deleted user:", deletedUser);
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
