package backend.goorm.member.oauth.dto;

import java.util.Map;

public class KakaoMemberInfo extends OauthMemberInfo {

    private Map<String, Object> attributes;

    private Map<String, Object> profile_item;

    private String id;

    public KakaoMemberInfo(Map<String, Object> attributes) {
        super(attributes);
        this.attributes = (Map<String, Object>) attributes.get("properties");
        this.profile_item = (Map<String, Object>) attributes.get("kakao_account");
        this.id = String.valueOf(attributes.get("id"));
    }

    @Override
    public String getProviderId() {
        return id;
    }


    @Override
    public String getEmail() {
        return (String) profile_item.get("email");
    }

    @Override
    public String getNickname() {
        return (String) attributes.get("nickname");
    }

    @Override
    public String getProfile() {
        return  (String) attributes.get("profile_image");
    }

}
