import type { PrismaClient } from "@prisma/client";

export const updateAllDateInfo = async (prisma: PrismaClient) => {
  const journals = await prisma.journalEntry.groupBy({
    by: ["date"],
    _count: true
  });

  console.log("Number Journal Groups", journals);

  //   await Promise.all(
  //     journals.map(async (current) => {
  //       const currentDate = current.date;
  //       await prisma.journalEntry.updateMany({
  //         where: { date: currentDate },
  //         data: additionalDateInfo(currentDate)
  //       });
  //     })
  //   );
};

export const updateDateInfo = async (prisma: PrismaClient) => {
  //Get a count of journals without a date
  const noDateJournals = await prisma.journalEntry.count({
    where: { year: "" }
  });
  console.log("Number of journals without date info", noDateJournals);
  if (noDateJournals > 0) {
    updateAllDateInfo(prisma);
  }
};
