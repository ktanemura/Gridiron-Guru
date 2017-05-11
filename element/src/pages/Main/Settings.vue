<script>
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

export default {
  data() {
    return {
    	authRequest: {
    		url: 'https://api.login.yahoo.com/oauth2/request_auth?',
    		client_id: 'dj0yJmk9UUdja0lOdmo0dlhXJmQ9WVdrOWJIRjBVRFJSTjJzbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD05Mw--',
    		redirect_uri: 'https://localhost:8010',
    		response_type: 'token'
    	}
    };
  },
</script>