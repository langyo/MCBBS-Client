/*
 *     Copyright 2016-2017 SparklingComet @ http://shanerx.org
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *          http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.shanerx.mojang;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
import org.apache.commons.codec.binary.Base64;

/**
 * <p>This class represents the connection with the Mojang API.
 * <p>All instances of other classes of this wrapper API should be retrieved through this class.
 * <p>Remember to call <code>api.connect()</code> after creating an instance of this class.
 */
@SuppressWarnings({"unchecked"})
public class Mojang {

    private Map<String, ServiceStatus> apiStatus;

    /**
     * Constructor. Initializes member variables.
     */
    public Mojang() {
        apiStatus = new HashMap<>();
    }

    private static JsonObject getJSONObject(String url) {
        JsonObject obj;

        try {
            obj = (JsonObject) new JsonParser().parse(Unirest.get(url).asString().getBody());
            String err = obj.get("error").getAsString();
            if (err != null) {
                switch (err) {
                    case "IllegalArgumentException":
                        throw new IllegalArgumentException(obj.get("errorMessage").getAsString());
                    default:
                        throw new RuntimeException(err);
                }
            }
        } catch (UnirestException e) {
            throw new RuntimeException(e);
        }

        return obj;
    }

    private static JsonArray getJSONArray(String url) {
        JsonArray arr;

        try {
            arr = (JsonArray) new JsonParser().parse(Unirest.get(url).asString().getBody());
        } catch (UnirestException e) {
            throw new RuntimeException(e);
        }

        return arr;
    }

    /**
     * <p>Opens the connection with the Mojang API.
     * Should <strong>always</strong> be called after creating the API object.
     *
     * <p><strong>Example:</strong>
     * <code>Mojang api = new Mojang().connect();</code>
     *
     * @return the api itself. Useful for concatenation.
     */
    public Mojang connect() {
        JsonArray arr = getJSONArray("https://status.mojang.com/check");

        for (int i = 0; i <= 7; ++i) {
            ServiceType st = ServiceType.values()[i];
            String service = st.toString();
            JsonObject obj = (JsonObject) arr.get(i);

            apiStatus.put(service,
                    ServiceStatus.valueOf((obj.get(service).getAsString()).toUpperCase()));
        }

        return this;
    }

    /**
     * Retrieves the {@link org.shanerx.mojang.Mojang.ServiceStatus status} of a portion of the API.
     * Check the enum entries for {@link org.shanerx.mojang.Mojang.ServiceStatus} for possible response types.
     *
     * @param service the service type
     * @return the status of said service
     */
    public ServiceStatus getStatus(ServiceType service) {
        if (service == null) {
            return ServiceStatus.UNKNOWN;
        }
        return apiStatus.get(service.toString());
    }

    /**
     * Retrieves the current UUID linked to a username.
     *
     * @param username the username
     * @return the UUID as a {@link String String}
     */
    public String getUUIDOfUsername(String username) {
        return getJSONObject("https://api.mojang.com/users/profiles/minecraft/" + username).get("id").getAsString();
    }

    /**
     * Retrieves the UUID linked to a username at a certain moment in time.
     *
     * @param username  the username
     * @param timestamp the Java Timestamp that represents the time
     * @return the UUID as a {@link String String}
     */
    public String getUUIDOfUsername(String username, String timestamp) {
        return getJSONObject("https://api.mojang.com/users/profiles/minecraft/" + username + "?at=" + timestamp).get("id").getAsString();
    }

    /**
     * Retrieves all the username a certain UUID has had in the past, including the current one.
     *
     * @param uuid the UUID
     * @return a map with the username as key value and the Timestamp as a {@link Long Long}
     */
    public Map<String, Long> getNameHistoryOfPlayer(String uuid) {
        JsonArray arr = getJSONArray("https://api.mojang.com/user/profiles/" + uuid + "/names");
        Map<String, Long> history = new HashMap<>();
        arr.forEach(o ->
        {
            JsonObject obj = (JsonObject) o;
            history.put(obj.get("name").getAsString(), obj.get("changedToAt") == null ? 0 : Long.parseLong(obj.get("changedToAt").getAsString()));
        });
        return history;
    }

    /**
     * Returns the {@link PlayerProfile PlayerProfile} object which holds and represents the metadata for a certain account.
     *
     * @param uuid the UUID of the player
     * @return the {@link PlayerProfile PlayerProfile} object}
     */
    public PlayerProfile getPlayerProfile(String uuid) {
        JsonObject obj = getJSONObject("https://sessionserver.mojang.com/session/minecraft/profile/" + uuid);
        String name = obj.get("name").getAsString();
        Set<PlayerProfile.Property> properties = StreamSupport.stream(obj.get("properties").getAsJsonArray().spliterator(), false).map(o -> {
            PlayerProfile.Property p;
            JsonObject prop = (JsonObject) o;

            String propName = prop.get("name").getAsString();
            String propValue = prop.get("value").getAsString();
            if (propName.equals("textures")) {
                JsonObject tex;
                tex = (JsonObject) new JsonParser().parse(new String(Base64.decodeBase64(propValue.getBytes())));
                PlayerProfile.TexturesProperty q = new PlayerProfile.TexturesProperty();
                q.timestamp = tex.get("timestamp").getAsLong();
                q.profileId = tex.get("profileId").getAsString();
                q.profileName = tex.get("profileName").getAsString();
                q.signatureRequired = tex.get("signatureRequired").getAsBoolean();
                q.textures = ((JsonObject) tex.get("textures")).entrySet().stream().collect(Collectors.toMap(
                        e -> (String) e.getKey(),
                        e -> {
                            try {
                                return new URL(e.getValue().getAsJsonObject().get("url").getAsString());
                            } catch (MalformedURLException e1) {
                                /* I want lambdas with exceptions in Java, *please* */
                                throw new RuntimeException("Wrapper for checked exception for lambda", e1);
                            }
                        }));
                p = q;
            } else
                p = new PlayerProfile.Property();
            p.name = propName;
            p.signature = prop.get("signature").getAsString();
            p.value = propValue;
            return p;
        }).collect(Collectors.toSet());
        return new PlayerProfile(uuid, name, properties);
    }

    /**
     * Updates the skin of a player using a URI.
     * This means that the image file will <strong>not</strong> be uploaded to Mojang's servers, hence the API will need to query the given URI.
     *
     * @param uuid     the UUID of said player
     * @param token    the token used for API authentication
     * @param skinType the {@link org.shanerx.mojang.Mojang.SkinType type} of the skin
     * @param skinUrl  a direct URL to the skin
     */
    public void updateSkin(String uuid, String token, SkinType skinType, String skinUrl) {
        try {
            Unirest.post("https://api.mojang.com/user/profile/" + uuid + "/skin").header("Authorization", "Bearer " + token).field("model", skinType.toString()).field("url", skinUrl).asString();
        } catch (UnirestException e) {
            e.printStackTrace();
        }
    }

    /**
     * Updates the skin of a player using a URI.
     * The raw skin data will be uploaded to Mojang's servers and stored there potentially forever.
     *
     * @param uuid     the UUID of said player
     * @param token    the token used for API authentication
     * @param skinType the {@link org.shanerx.mojang.Mojang.SkinType type} of the skin
     * @param file     the raw image data
     */
    @Untested
    public void updateAndUpload(String uuid, String token, SkinType skinType, String file) {
        try {
            Unirest.put("https://api.mojang.com/user/profile/" + uuid + "/skin").header("Authorization", "Bearer " + token).field("model", skinType.toString().equals("") ? "alex" : skinType.toString()).field("file", file).asString();
        } catch (UnirestException e) {
            e.printStackTrace();
        }
    }

    /**
     * Resets the skin to the default.
     *
     * @param uuid  the UUID of the player
     * @param token the token used for API authentication
     */
    public void resetSkin(String uuid, String token) {
        try {
            Unirest.delete("https://api.mojang.com/user/profile/" + uuid + "/skin").header("Authorization", "Bearer " + token).asString();
        } catch (UnirestException e) {
            e.printStackTrace();
        }
    }

    /**
     * <p>Returns a list of blacklisted hostnames, belonging to servers that were blocked due to Mojang's EULA infringement.
     * <p><strong>N.B.:</strong> These may not be in human friendly form as they were hashed. You may want to use third-party services to obtain an (unofficial) list.
     *
     * @return a {@link List List} of all the blocked hostnames
     */
    public List<String> getServerBlacklist() {
        try {
            return Arrays.asList(Unirest.get("https://sessionserver.mojang.com/blockedservers").asString().getBody().split("\n"));
        } catch (UnirestException e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * Returns the official mojang's product sales statistics.
     *
     * @param options the query {@link org.shanerx.mojang.SalesStats.Options options}
     * @return the stats
     */
    @Untested
    public SalesStats getSaleStatistics(SalesStats.Options... options) {
        JsonArray arr = new JsonArray();
        for (SalesStats.Options opt : options) arr.add(opt.toString());

        SalesStats stats = null;
        try {
            JsonObject resp = (JsonObject) new JsonParser().parse(Unirest.post("https://api.mojang.com/orders/statistics").field("metricKeys", arr).asString().getBody());
            stats = new SalesStats(Integer.valueOf(resp.get("total").getAsString()), resp.get("last24h").getAsInt(), resp.get("saleVelocityPerSeconds").getAsInt());
        } catch (Exception e) {
            e.printStackTrace();
        }
        return stats;
    }

    /**
     * This enum represents the possible Mojang API servers availability statuses.
     */
    public enum ServiceStatus {

        RED,
        YELLOW,
        GREEN,
        UNKNOWN
    }

    /**
     * This enum represents the various portions of the Mojang API.
     */
    public enum ServiceType {

        MINECRAFT_NET,
        SESSION_MINECRAFT_NET,
        ACCOUNT_MOJANG_COM,
        AUTHSERVER_MOJANG_COM,
        SESSIONSERVER_MOJANG_COM,
        API_MOJANG_COM,
        TEXTURES_MINECRAFT_NET,
        MOJANG_COM;

        /**
         * <p>This method overrides {@code java.lang.Object.toString()} and returns the address of the mojang api portion a certain enum constant represents.
         * <p><strong>Example:</strong>
         * {@code org.shanerx.mojang.Mojang.ServiceType.MINECRAFT_NET.toString()} will return {@literal minecraft.net}
         *
         * @return the string
         */
        @Override
        public String toString() {
            return name().toLowerCase().replace("_", ".");
        }
    }

    /**
     * This enum represents the skin types "Alex" and "Steve".
     */
    public enum SkinType {
        /**
         * Steve
         */
        DEFAULT,
        /**
         * Alex
         */
        SLIM;

        /**
         * Returns the query parameter version for these skin types in order to send HTTP requests to the API.
         *
         * @return the string
         */
        @Override
        public String toString() {
            return this == DEFAULT ? "" : "slim";
        }
    }
}
