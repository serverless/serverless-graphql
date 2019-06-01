const userType = `
    type Email {
        address: String
        verified: Boolean
    }

    type Address {
        street: String
        city: String
        state: String
        region: String
        country: String
        zip: String
    }

    type Phone {
        number: String
        verified: Boolean
    }

    type Height {
        ft: Int
        in: Int
    }

    type Image {
        filesize: Int
        resolution: String
        thumbnail: String
        imagetype: String
        url: String
    }

    type ProfileImage {
        fullResolution: String,
        displayResolution: String,
        thumbnailResolution: String
    }

    type Service {
        nameOfService: String
        price: Int
        showPriceAfterBooking: Boolean
        bookingFeePercentage: Int
        flatBookingFee: Int
        duration: Int
        onePersonBooking: Boolean
        noTravel: Boolean
    }

    type Available {
        available: Boolean
        timeRangeStart: String
        timeRangeEnd: String
        allday: Boolean
    }

    type Award {
        type: String
        Month: String
        Year: Int
    }

    type BasicInformation {
        username: String
        firstname: String
        lastname: String
        middleInitial: String
        gender: String
        email: Email
        address: Address
        birthDate: String
        age: Int
        phone: Phone
    }

    type FavoriteItem {
        userId: ID!
        userName: String!
        user_name: String!
        userAvatar: String!
    }

    type CustomFavorites {
        models: [FavoriteItem]
        photographers: [FavoriteItem]
        muas: [FavoriteItem]
    }

    type Favorites {
        models: [String]
        photographers: [String]
        brands: [String]
        muas: [String]
    }

    type Measurements {
        height: Height
        waist: Int
        shoe: Float
        tattoos: Boolean
        hairColor: String
        eyeColor: String
    }

    type Availability {
        sunday: Available
        monday: Available
        tuesday: Available
        wednesday: Available
        thursday: Available
        friday: Available
        saturday: Available
    }

    type EmailNotification {
        notifications: Boolean
        newsletter: Boolean
        contentUpdates: Boolean
        reminders: Boolean
    }

    type PhotoUpload {
        profilePicture: ProfileImage
    }

    type RateOptions {
        ratetype: String
        amount: Int
    }

    type PhotographerOptions {
        camera: String
        lens: String
    }

    type Preferences {
        emailNotification: EmailNotification
    }

    type Password {
        bcrypt: String
    }

    type Token {
        when: String
        hashedToken: String
    }

    type Resume {
        loginTokens: [Token]
    }

    type Stripe {
        access_token: String
        livemode: Boolean
        refresh_token: String
        token_type: String
        stripe_publishable_key: String
        stripe_user_id: String
        scope: String
    }

    type Sendbird {
        user_id: String
        nickname: String
        profile_url: String
        access_token: String
        is_online: Boolean
        last_seen_at: Int
    }

    type AccountService {
        password: Password
        paypal: String
        sendbird: Sendbird
        stripe: Stripe
        resume: Resume
    }

    type User {
        _id: ID!
        active: Boolean
        admin: Boolean
        createdAt: String
        updatedAt: String
        language: String
        pinResetPasscode: String
        verified: Boolean
        favoriteCount: Int
        profileClicks: Int
        basicInformation: BasicInformation
        favorites: Favorites
        type: String
        measurements: Measurements
        photoUpload: PhotoUpload
        tags: [String]
        rateOptions: RateOptions
        makeUpServices: [Service]
        photographerOptions: PhotographerOptions
        availability: Availability
        preferences: Preferences
        accountServices: AccountService
        awards: [Award]
    }

    type StripeResponse {
        access_token: String
        livemode: Boolean
        refresh_token: String
        token_type: String
        stripe_publishable_key: String
        stripe_user_id: String
        scope: String
        error: String
        error_description: String
    }

     input EmailInput {
        address: String
        verified: Boolean
    }

    input AddressInput {
        street: String
        city: String
        state: String
        region: String
        country: String
        zip: String
    }

    input PhoneInput {
        number: String
        verified: Boolean
    }

    input HeightInput {
        ft: Int
        in: Int
    }

    input ProfileImageInput {
        fullResolution: String
        displayResolution: String
        thumbnailResolution: String
    }

    input ServiceInput {
        nameOfService: String
        price: Int
        showPriceAfterBooking: Boolean
        bookingFeePercentage: Int
        flatBookingFee: Int
        duration: Int
        onePersonBooking: Boolean
        noTravel: Boolean
    }

    input AvailableInput {
        available: Boolean
        timeRangeStart: String
        timeRangeEnd: String
        allday: Boolean
    }

    input AwardInput {
        type: String
        Month: String
        Year: Int
    }

    input BasicInformationInput {
        username: String
        firstname: String
        lastname: String
        middleInitial: String
        gender: String
        email: EmailInput
        address: AddressInput
        birthDate: String
        age: Int
        phone: PhoneInput
    }

    input FavoritesInput {
        models: [String]
        photographers: [String]
        brands: [String]
        muas: [String]
    }

    input MeasurementsInput {
        height: HeightInput
        waist: Int
        shoe: Float
        tattoos: Boolean
        hairColor: String
        eyeColor: String
    }

    input AvailabilityInput {
        sunday: AvailableInput
        monday: AvailableInput
        tuesday: AvailableInput
        wednesday: AvailableInput
        thursday: AvailableInput
        friday: AvailableInput
        saturday: AvailableInput
    }

    input EmailNotificationInput {
        notifications: Boolean
        newsletter: Boolean
        contentUpdates: Boolean
        reminders: Boolean
    }

    input PhotoUploadInput {
        profilePicture: ProfileImageInput
    }

    input RateOptionsInput {
        ratetype: String
        amount: Int
    }

    input PhotographerOptionsInput {
        camera: String
        lens: String
    }

    input PreferencesInput {
        emailNotification: EmailNotificationInput
    }

    input PasswordInput {
        bcrypt: String
    }

    input TokenInput {
        when: String
        hashedToken: String
    }

    input ResumeInput {
        loginTokens: [TokenInput]
    }

    input StripeInput {
        access_token: String
        livemode: Boolean
        refresh_token: String
        token_type: String
        stripe_publishable_key: String
        stripe_user_id: String
        scope: String
    }

    input SendbirdInput {
        user_id: String
        nickname: String
        profile_url: String
        access_token: String
        is_online: Boolean
        last_seen_at: Int
    }

    input AccountServiceInput {
        password: PasswordInput
        paypal: String
        sendbird: SendbirdInput
        stripe: StripeInput
        resume: ResumeInput
    }

    input UserInput {
        active: Boolean
        admin: Boolean
        createdAt: String
        updatedAt: String
        language: String
        pinResetPasscode: String
        verified: Boolean
        favoriteCount: Int
        profileClicks: Int
        basicInformation: BasicInformationInput
        favorites: FavoritesInput
        type: String
        measurements: MeasurementsInput
        photoUpload: PhotoUploadInput
        tags: [String]
        rateOptions: RateOptionsInput
        makeUpServices: [ServiceInput]
        photographerOptions: PhotographerOptionsInput
        availability: AvailabilityInput
        preferences: PreferencesInput
        accountServices: AccountServiceInput
        awards: [AwardInput]
    }

    type Result {
        result: User
        message: String
    }

    input Rates {
        free: Boolean
        below_20: Boolean
        below_40: Boolean
        below_70: Boolean
        below_100: Boolean
        up_100: Boolean
        flat: Boolean
    }

    input Categories {
        models: Boolean
        photographers: Boolean
        mua: Boolean
        brands: Boolean
        campaigns: Boolean
    }

    input Locations {
        asia: Boolean
        au_nz: Boolean
        ca: Boolean
        eu: Boolean
        m_east: Boolean
        other: Boolean
        uk: Boolean
        us: Boolean
    }

    input Sex {
        male: Boolean
        female: Boolean
    }

    type HomepageUsers {
        top_models: [User]
        top_photographers: [User]
        top_muas: [User]
        new_models: [User]
        new_photographers: [User]
        new_muas: [User]
        featured_models: [User]
        featured_photographers: [User]
        featured_muas: [User]
    }

    type SimpleMedia {
        _id: ID
        type: String
        url: String
    }

    type EditProfileOutput {
        photos: [SimpleMedia]
        detail: User
    }

    type Query {
        users: [User]
        getUserById(
            _id: ID!
        ): User
        getUserByIdForEditProfile(
            _id: ID!
        ): EditProfileOutput
        getUserAvailabilityById(
            _id: ID!
        ): Availability
        getUserFavoritesById(
            _id: ID!
        ): CustomFavorites
        getUserByUsername(
            username: String!
        ): User
    }

    type Mutation {
        login(
            email: String!
            password: String!
        ): Result
        createUser(
            user: UserInput!
        ): User
        getUserByPreferences(
           _id: ID!
        ): User
        getUsersByType(
            type: String!
            user_type: String!
            limit: Int!
        ): [User]
        getSearchResults(
            key: String
            categories: Categories
            locations: Locations
            sex: Sex
            rates: Rates
        ): [User]
        getUserByEmail(
            email: String
        ): User
        updateUser(
            _id: ID!
            user: UserInput!
        ): User
        updateUserByProfilePicture(
            _id: ID!
            profilePicture: ProfileImageInput!
        ): User
        updateUserForModel(
            _id: ID!
            basicInformation: BasicInformationInput!
            measurements: MeasurementsInput!
            rateOptions: RateOptionsInput!
            tags: [String]
            photoUpload: PhotoUploadInput
        ): User
        updateUserForMUA(
            _id: ID!
            basicInformation: BasicInformationInput!
            makeUpServices: [ServiceInput]
            tags: [String]
            photoUpload: PhotoUploadInput
        ): User
        updateUserForPhotographer(
            _id: ID!
            basicInformation: BasicInformationInput!
            photographerOptions: PhotographerOptionsInput
            rateOptions: RateOptionsInput!
            tags: [String]
            photoUpload: PhotoUploadInput
        ): User
        updateUserByPreferences(
            _id: ID!
            preferences: PreferencesInput!
        ): User
        updateUserByAvailability(
            _id: ID!
            availability: AvailabilityInput!
        ): User
        deleteUser(
            _id: ID!
        ): String
        integrateStripe(
            _id: ID!
            code: String!
        ): User
        integrateSendbird(
            _id: ID!
            user_id: String!
            nickname: String!
            profile_url: String!
        ): User
        updateForFavoriteCount(
            user_id: String!
            account_id: String!
            account_type: String!
            type: String!
        ): User
        updateForFavoriteArray(
            user_id: String!
            account_id: String!
            account_type: String!
            type: String!
        ): User
        updateForPassword(
            user_id: ID!
            password: String!
        ): User
        resetPassword(
            email: String!
            password: String!
        ): User
        requestResetPassword(
            email: String!
        ): String
        verifyEmail(
            email: String!
        ): String
    }
`;

export { userType };
