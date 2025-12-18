-- CreateTable
CREATE TABLE "auth_tokens" (
    "token_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "refresh_token" TEXT NOT NULL,
    "user_agent" TEXT,
    "ip_address" TEXT,
    "expires_at" TIMESTAMP(3),
    "revoked" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "auth_tokens_pkey" PRIMARY KEY ("token_id")
);

-- CreateTable
CREATE TABLE "otp" (
    "otp_id" UUID NOT NULL,
    "otp" TEXT NOT NULL,
    "user_email" TEXT NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "is_expired" BOOLEAN NOT NULL DEFAULT false,
    "is_used" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "otp_pkey" PRIMARY KEY ("otp_id")
);

-- CreateIndex
CREATE INDEX "otp_user_email_idx" ON "otp"("user_email");

-- AddForeignKey
ALTER TABLE "auth_tokens" ADD CONSTRAINT "auth_tokens_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;
