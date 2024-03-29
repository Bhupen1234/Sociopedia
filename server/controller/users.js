
import User from "../model/User.js";

export const getUser=async(req,res)=>{

try {
    const {id}= req.params;
    let user = await User.findById(id);
    res.status(200).json(user);
} catch (error) {
    res.status(404).json({message:"User not found"})
}

}


export const getUserFriends = async(req,res)=>{
    try {
        const {id} = req.params ;
        const user = await User.findById(id)

        const usersFriend = await Promise.all(user.friends.map((id)=> User.findById(id)));
        if(usersFriend.length === 0){
           return res.status(400).json({message : "User has no friends"})
        }
        const formattedFriends = usersFriend.map(({_id,firstName,lastName,occupation,location,picturePath})=>{
            return {_id,firstName,lastName,occupation,location,picturePath}
        })

        res.status(200).json(formattedFriends);

    } catch (error) {
        res.status(500).json({message:"Something went wrong :"+error})
    }
}


export const addRemoveFriend =async(req,res)=>{
    try {
        const {id,friendId} =req.params;

        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        if(user.friends.includes(friendId)){
            user.friends = user.friends.filter((id)=>id !== friendId);
            friend.friends =friend.friends.filter((id)=> id !== id)
        }

        else{
            user.friends.push(friendId);
            friend.friends.push(id)
        }
        await user.save();
        await friend.save();

        const friends =await Promise.all(
            user.friends.map((id)=>User.findById(id))
        )

        const formattedFriends = friends.map(({_id,firstName,lastName,occupation,location,picturePath})=>{
            return {_id,firstName,lastName,occupation,location,picturePath}
        })

        res.status(200).json(formattedFriends);

        

    } catch (error) {
        res.status(500).json({message:"Something went wrong :"+error.message})
    }
}




