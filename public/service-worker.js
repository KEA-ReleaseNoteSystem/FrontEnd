self.addEventListener("fetch", function (event) {
    const { url } = event.request;
    if (url === "http://localhost:3000/home") {
        event.respondWith(
            new Response(
                JSON.stringify({
                    message: "this message is re-written by service-worker",
                })
            )
        );
    }
});