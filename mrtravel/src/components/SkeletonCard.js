import React from "react";
import Skeleton from "react-loading-skeleton";

export default function SkeletonCard({ cards }){
    return Array(cards)
    .fill(0)
    .map((_, i) => {
        return <Skeleton className="card card1" key={i} style={{ backgroundColor: "#313131" }}/>
    })
}