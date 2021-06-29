import { query } from "faunadb";
import { fauna } from "../../../services/fauna";
import { stripe } from "../../../services/stripe";

export async function saveSubscription(
    subscriptionId: string,
    customerId: string,
    createAction = false
) {
    const userRef = await fauna.query(
        query.Select(
            "ref",
            query.Get(
                query.Match(
                    query.Index('user_by_stripe_customer_id'),
                    customerId
                )
            )
        )
    )

    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    const subscriptionData = {
        id: subscription.id,
        userId: userRef,
        status: subscription.status,
        price_id: subscription.items.data[0].price.id
    };

    console.log(subscriptionData);

    if (createAction) {
        await fauna.query(
            query.Create(
                query.Collection('subscriptions'),
                { data: subscriptionData }
            )
        )
    } else {
        await fauna.query(
            query.Replace(
                query.Select(
                    "ref",
                    query.Get(
                        query.Match(
                            query.Index('subscription_by_id'),
                            subscriptionId,
                        )
                    )
                ),
                { data: subscriptionData }
            )
        )
    }
}

// import { fauna } from "../../../services/fauna";
// import { query as q } from 'faunadb';
// import { stripe } from "../../../services/stripe";
//
// export async function saveSubscription (
//     subscriptionId: string,
//     customerId: string,
//     createAction = false,
// ) {
//     console.log(subscriptionId, customerId);
//
//     const userRef = await fauna.query(
//         q.Select(
//             "ref",
//             q.Get(
//                 q.Match(
//                     q.Index('user_by_stripe_customer_id'),
//                     customerId
//                 )
//             )
//         )
//     )
//
//     const subscription = await stripe.subscriptions.retrieve(subscriptionId)
//
//     const subscriptionData = {
//         id: subscription.id,
//         userId: userRef,
//         status: subscription.status,
//         price_id: subscription.items.data[0].price.id,
//     }
//
//     // can create an if for existing subscriptions if you have more than one way to subscribe
//     if (createAction){
//         await fauna.query(
//             q.Create(
//                 q.Collection('subscriptions'),
//                 { data: subscriptionData}
//             )
//         )
//     } else {
//         await fauna.query(
//             q.Replace(
//                 q.Select(
//                     "ref",
//                     q.Get(
//                         q.Match(
//                             q.Index('subcription_by_id'),
//                             subscriptionId,
//                         )
//                     )
//                 ),
//                 {data: subscriptionData}
//             )
//         )
//     }
// }