import { parse } from "csv-parse";
import { PendingUniversity } from "../models/PendingUniversity";
import { University } from "../models/University";
import { User } from "../models/User";
import { Types } from "mongoose";
import type { Readable } from "stream";

export async function createPendingUniversity(data: {
  uniName: string;
  aisheCode: string;
  domain?: string;
  contactEmail: string;
  contactPhone?: string;
}) {
  try {
    return await PendingUniversity.create(data);
  } catch (error: any) {
    throw new Error(`Error in createPendingUniversity: ${error.message}`);
  }
}

export async function approveUniversity(pendingId: string) {
  try {
    const pending = await PendingUniversity.findById(pendingId);
    if (!pending) throw new Error("Pending university not found");

    // console.log("pending", pending);

    const uni = await University.create({
      uniName: pending.uniName,
      aisheCode: pending.aisheCode,
      contactEmail: pending.contactEmail,
      contactPhone: pending.contactPhone,
    });

    await PendingUniversity.deleteOne({ _id: pending._id });
    return uni;
  } catch (error: any) {
    throw new Error(`Error in approveUniversity: ${error.message}`);
  }
}

export async function declineUniversity(pendingId: string) {
  try {
    const result = await PendingUniversity.deleteOne({ _id: pendingId });
    if (result.deletedCount === 0) {
      throw new Error("Pending university not found or already deleted");
    }
  } catch (error: any) {
    throw new Error(`Error in declineUniversity: ${error.message}`);
  }
}

export async function ingestUsersCsv(universityId: string, stream: Readable): Promise<{ count: number }> {
  const uniId = new Types.ObjectId(universityId);
  const BULK_SIZE = 1000;
  let ops: any[] = [];
  let rowCount = 0;

  return new Promise((resolve, reject) => {
    stream
      .pipe(parse({ columns: true, trim: true }))
      .on("data", (rec) => {
        const uid = String(rec.uid).trim();
        const email = String(rec.email).toLowerCase();

        ops.push({
          updateOne: {
            filter: {
              universityId: uniId,
              $or: [{ email }, { uid }], // ✅ Prevent duplicate uid OR email
            },
            update: {
              $setOnInsert: {
                universityId: uniId,
                uid,
                name: String(rec.name),
                email,
                phone: String(rec.phone),
                role: rec.role === "counsellor" ? "counsellor" : "student",
                isActive: true,
              },
            },
            upsert: true,
          },
        });

        rowCount++;

        if (ops.length === BULK_SIZE) {
          stream.pause();
          User.bulkWrite(ops, { ordered: false })
            .then(() => {
              ops = [];
              stream.resume();
            })
            .catch(reject);
        }
      })
      .on("end", () => {
        if (ops.length) {
          User.bulkWrite(ops, { ordered: false })
            .then(() => resolve({ count: rowCount }))
            .catch(reject);
        } else {
          resolve({ count: rowCount });
        }
      })
      .on("error", reject);
  });
}
