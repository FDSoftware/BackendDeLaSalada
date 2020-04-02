export const getJWT_body = (username: string) => {
  return {
    typ: "at+jwt",
    nbf: 1585596016,
    exp: 3085599616,
    iss: "https://delsud.com.ar",
    aud: "dds_be",
    client_id: "dds_fe",
    sub: "f3705b9a-bb3f-4443-8d6a-dc665119bbe2",
    auth_time: 1585596016,
    idp: "local",
    preferred_username: username,
    unique_name: "alice",
    name: username,
    last_name: "Smith",
    kunnr_id: "XXX-XXX",
    email: "AliceSmith@email.com",
    email_verified: true,
    scope: ["openid", "dds_be"],
    amr: ["pwd"]
  };
};
export default getJWT_body;
