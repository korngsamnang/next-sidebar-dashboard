import { ContentLayout } from "@/components/admin-panel/content-layout";
import ContentWrapper from "@/components/content/content-wrapper";
import UpdateUserInfo from "@/app/(app)/account/update-user-info";
import UpdatePassword from "@/app/(app)/account/update-password";

export const metadata = {
    title: "SDF | Account Settings",
};

const Page = () => {
    return (
        <ContentLayout title="Account">
            <ContentWrapper>
                <div className="flex flex-col md:flex-row gap-4 md:gap-4">
                    <UpdateUserInfo />
                    <UpdatePassword />
                </div>
            </ContentWrapper>
        </ContentLayout>
    );
};

export default Page;
