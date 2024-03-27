<template>
    <div>

    </div>
</template>
<script>
import { io } from "socket.io-client"
import { PostData_normal, baseURL } from "../services/remotedatamodify";
import { useMainStore } from "../store/main";
export default {
    data() {
        return {
            baseUrl: baseURL
        }
    },
    created() {
        const URL = process.env.Node_ENV == "production" ? undefined : this.baseUrl;
        const socket = io(URL)
        socket.on("connect", () => {
            //console.log("socket got connected")
        })
        socket.on("updateUsers", () => {
            window.location.reload();
        })
    },
    methods: {

    }
}
</script>