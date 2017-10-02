export class CurrentUser {
    created_at: string;
    display_name: string;
    email: string;
    email_public: boolean;
    full_name: string;
    has_premium_features: boolean;
    human_readable_website: string;
    id: string;
    is_email_confirmed: boolean;
    is_hireable: boolean;
    languages_used_public: boolean;
    last_heartbeat: string;
    last_plugin: string;
    last_plugin_name: string;
    last_project: string;
    location: string;
    logged_time_public: boolean;
    modified_at: any;
    photo: string;
    photo_public: boolean;
    plan: string;
    timezone: string;
    username: string;
    website: string;

    constructor(){
        this.display_name = "";
        this.full_name = "";
        this.photo = "";
        this.website = "";
        this.human_readable_website = "";
        this.last_plugin = "";
        this.location = "";
        this.username = "";
        this.created_at = "";
        this.username = "";
    }
}