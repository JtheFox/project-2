const { checkNewLaunchData } = require('../utils/helpers')

const update = async () => {
    await checkNewLaunchData();
    process.exit(0);
}

update();