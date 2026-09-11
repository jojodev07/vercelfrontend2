import React, { useEffect, useState } from "react";
import { getFeedback } from "../axiosServices/axiosHelper";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function SecretReviewPage() {

    const [status, setStatus] = useState("التقييمات الموجودة حاليا");
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        getFeedback()
            .then((response) => {

                console.log("Data received:", response);
                setStatus("التقييمات الموجودة حاليا");
                setReviews(response.data);
                console.log(reviews);
            }).catch((err) => {
                console.error("Failed to fetch feedback:", error);
                setStatus("عذراً، حدث خطأ ما");
            });

    }, []);

    return (
        <div className="w-full h-full flex flex-col items-center justify-start pt-1.5">
            <p className="pb-2 font-bold text-2xl font-['Noto_Sans_Arabic_Variable']">{status}</p>
            <div className="space-y-4">
            {reviews.map((item, index) => (
                <Card key={index} className="max-w-md w-full">
                    <CardHeader>
                        <CardTitle className="text-yellow-500 text-center text-2xl">
                            {'★'.repeat(item.stars)}
                            {'☆'.repeat(5 - item.stars)}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-center font-['Noto_Sans_Arabic_Variable'] text-xl">
                            {item.review}
                        </p>
                    </CardContent>
                </Card>
            ))}
            </div>
        </div>
    )
}