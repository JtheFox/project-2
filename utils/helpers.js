module.exports = {
    parseLaunchData: (launch) => {
        return {
            id: launch.id,
            name: launch.name,
            success: launch.success,
            date: launch.date_unix,
            flight_number: launch.flight_number,
            icon: launch.links.patch.large,
            forum: launch.links.reddit.launch,
            webcast: launch.links.webcast,
            wiki: launch.links.wikipedia,
        }
    },
    parseRocketData: (rocket) => {
        return {
            id: rocket.id,
            name: rocket.name,
            first_flight: rocket.first_flight,
            image: rocket.flickr_images[0],
            wiki: rocket.wikipedia,
            description: rocket.description,
            launch_cost: rocket.cost_per_launch
        }
    }
}