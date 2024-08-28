"use client";
import React from 'react'
import Link from 'next/link'
import { IHref, IName } from '@/model/linkNav';

interface ILinkNavProps extends IHref, IName { }

function LinkNav({ href, name }: ILinkNavProps) {
    return (
        <Link href={href} className={`block py-2 px-3 md:p-0 "text-white"`}  >
            {name}
        </Link>
    )
}


export default LinkNav