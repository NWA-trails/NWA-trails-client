import { contactDetails } from "../emergency-contacts/contactDetails";
import { AccountDetails } from "../account/details";

export interface emergencyDetails {
    userDetails: AccountDetails;
    latitude: string;
    longitude: string;
    nearestTrail: string;
    primaryEmergencyContact: contactDetails;
}