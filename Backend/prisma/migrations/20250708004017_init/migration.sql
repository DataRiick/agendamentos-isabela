-- CreateTable
CREATE TABLE "Agendamento" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "especialidade" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "hora" TEXT NOT NULL,

    CONSTRAINT "Agendamento_pkey" PRIMARY KEY ("id")
);
