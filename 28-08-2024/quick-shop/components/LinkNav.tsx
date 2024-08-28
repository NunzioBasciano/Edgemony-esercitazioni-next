"use client";
import React from 'react'
import Link from 'next/link'
import { IItem } from '@/model/product';

interface ItemProps {
    item: IItem
}

function LinkNav({ item }: ItemProps) {
    return (
        <Link href={item.path} className={`block py-2 px-3 md:p-0 "text-white"`}  >
            {item.name}
        </Link>
    )
}

export default LinkNav