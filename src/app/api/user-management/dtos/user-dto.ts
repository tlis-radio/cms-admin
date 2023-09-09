export type UserDto = {
    id: string;
    description: string;
    email: string;
    firstname: string;
    isActive: boolean;
    lastname: string;
    memberSinceDate: string;
    membershipEndedDate: string;
    membershipEndedReason: string;
    nickname: string;
    profileImageUrl: string;
    roleHistory: Array<
    {
        functionEndDate: string;
        functionStartDate: string;
        role: { name: string; }
    }>;
};