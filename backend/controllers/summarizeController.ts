//require summarizerservice.ts
import { genSummary } from "../services/summarizeService";

const content: string = `
Person 1: Hey, Sarah, have you heard about that new cafe that opened up downtown?
Person 2: Oh, yeah, I think I saw something about it on social media. What's it called again?
Person 1: It's called "Steamy Beans." Apparently, they have this amazing selection of exotic coffees from around the world.
Person 2: That sounds interesting! I'm always up for trying new coffee places. When do you want to check it out?
Person 1: How about this Saturday afternoon? We can grab a cup of coffee and catch up.
Person 2: Sounds perfect! I've been so busy lately, it'll be nice to have a relaxing afternoon.
Person 1: Definitely. Plus, it'll give us a chance to explore someplace new in the city.
Person 2: Absolutely! I'm looking forward to it. Thanks for suggesting it.
Person 1: No problem at all. It's always fun discovering hidden gems together.
`;


export const getSummary = async (req, res) => {
    try {
        const summary = await genSummary(content);
        res.send(summary);
        console.log(summary);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error generating summary' });
    }
}

//export the function
module.exports = { getSummary };

