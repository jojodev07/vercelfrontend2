import React, { useEffect, useState } from "react";
import { getFeedback } from "../axiosServices/axiosHelper";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export function SecretReviewPage() {

    const [status, setStatus] = useState("التقييمات الموجودة حاليا");
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getFeedback()
            .then((response) => {

                console.log("Data received:", response);
                setStatus("التقييمات الموجودة حاليا");
                setReviews(response.data);
            }).catch((err) => {
                console.error("Failed to fetch feedback:", err);
                setStatus("عذراً، حدث خطأ ما");
            }).finally(() => setLoading(false));

    }, []);

    return (
        <main className="flex min-h-[calc(100vh-(--spacing(14)))] w-full min-w-0 flex-col items-center overflow-y-auto bg-zinc-50 px-4 pt-6 dark:bg-zinc-950" dir="rtl">
            <header className="mb-6 w-full max-w-6xl text-center">
                <p className="font-['Noto_Sans_Arabic_Variable'] text-2xl font-bold text-zinc-900 dark:text-zinc-50">{status}</p>
                <p className="mt-2 font-['Noto_Sans_Arabic_Variable'] text-sm text-zinc-500 dark:text-zinc-400">
                    آراء المستخدمين وتقييماتهم
                </p>
            </header>
            {loading && <p className="text-sm text-zinc-500">جارٍ تحميل التقييمات...</p>}
            {!loading && reviews.length === 0 && (
                <p className="text-sm text-zinc-500">لا توجد تقييمات بعد.</p>
            )}
            <div className="grid w-full max-w-6xl grid-cols-1 gap-4 pb-8 sm:grid-cols-2 xl:grid-cols-3">
            {reviews.map((item, index) => (
                <Card key={index} className="w-full min-w-0 max-w-none">
                    <CardHeader>
                        <CardTitle className="text-yellow-500 text-center text-2xl">
                            {'★'.repeat(Number(item.stars) || 0)}
                            {'☆'.repeat(Math.max(0, 5 - (Number(item.stars) || 0)))}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="wrap-break-word text-center font-['Noto_Sans_Arabic_Variable'] text-base leading-8 text-zinc-700 dark:text-zinc-300">
                            {item.review?.trim() || "تقييم دون اقتراح"}
                        </p>
                    </CardContent>
                </Card>
            ))}
            </div>
        </main>
    )
}