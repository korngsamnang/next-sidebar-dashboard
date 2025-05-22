import { ContentLayout } from "@/components/admin-panel/content-layout";
import ContentWrapper from "@/components/content/content-wrapper";

export const metadata = {
    title: "Dashboard",
};
export default function Page() {
    return (
        <ContentLayout title="Dashboard">
            <ContentWrapper>
                <h1>Dashboard</h1>
            </ContentWrapper>
        </ContentLayout>
    );
}
