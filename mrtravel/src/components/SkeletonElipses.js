import React from "react";
import Skeleton from "react-loading-skeleton";

export default function SkeletonElipses({elipses}){
    return Array(elipses)
    .fill(0)
    .map((_, i) => {
        return <Skeleton key={i} circle width={40} height={40} className="elipse" style={{ backgroundColor: "#313131" }}/>
    });
}