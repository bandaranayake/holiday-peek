import React from 'react';
import Link from "next/link";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

const DialogAttribution: React.FC = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Label className="hover:underline cursor-pointer">Attributions</Label>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Attributions</DialogTitle>
                    <DialogDescription>
                        Data and assets used in this application:
                    </DialogDescription>
                </DialogHeader>
                <div className="text-sm mt-0">
                    <li>Holiday dates provided by <Link className="hover:underline" href="https://github.com/commenthol/date-holidays" target="_blank" rel="noopener noreferrer">date-holidays</Link>. </li>
                    <li>Flag icons courtesy of <Link className="hover:underline" href="https://flagsapi.com/" target="_blank" rel="noopener noreferrer">Flags API</Link>.</li>
                </div>
                <DialogFooter>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DialogAttribution;

