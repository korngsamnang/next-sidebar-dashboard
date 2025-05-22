import { Card, CardContent } from "@/components/ui/card";

export default function ContentWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Card className="rounded-lg border-none mt-2">
            <CardContent className="p-6">
                <div>
                    <div className="flex flex-col relative">{children}</div>
                </div>
            </CardContent>
        </Card>
    );
}
