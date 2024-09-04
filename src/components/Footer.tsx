import Link from 'next/link';
import DialogAttribution from '@/components/DialogAttribution';

const Footer: React.FC = () => {
    return (
        <footer className="mt-12 pt-4 text-sm text-muted-foreground">
            <div className="container max-w-6xl mx-auto px-2 flex flex-col-reverse items-center justify-between sm:flex-row">
                <p className="mt-2">&copy; 2024 HolidayPeek. All rights reserved.</p>
                <nav className="flex gap-4 mt-2 sm:mt-0">
                    <Link
                        href="https://github.com/bandaranayake/holiday-peek"
                        target="_blank"
                        className="hover:underline"
                        prefetch={false}
                    >
                        Contribute
                    </Link>
                    <DialogAttribution />
                </nav>
            </div>
        </footer>
    );
};

export default Footer;
