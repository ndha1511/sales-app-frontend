import { useState } from "react";
import { sendCommentApi } from "../../../services/comment.service";
import { UserModel } from "../../../models/user.model";
import { getUserFromLocalStorage } from "../../../services/user.service";

type Props = {
    productId: number
}

const CommentForm = ({productId} : Props) => {
    const [commentText, setCommentText] = useState<string>("");
    const [rating, setRating] = useState<number>(1);
    const [files, setFiles] = useState<File[]>([]);
    const user: UserModel | null = getUserFromLocalStorage();
    const sendComment = async () => {
        try {
            await sendCommentApi({
                content: commentText,
                productId: productId,                       
                rating: rating,
                email: user?.email || "",
                media: files
            })
        } catch (error) {
            console.log("Error sending comment");
        }
    }

    const addFile = (event : React.ChangeEvent<HTMLInputElement>) => {
        const files : File[] | any = event.target.files;
        if(files) {
            setFiles([...files]);
        }
    }   
    return (
        <>
            <input placeholder="rating" value={rating} onChange={(e) => setRating(Number(e.target.value))} />
            <input placeholder="enter comment" value={commentText} onChange={(e) => setCommentText(e.target.value)} />
            <input type="file" multiple onChange={e => addFile(e)}/>
            <button onClick={sendComment}>send</button>
        </>
    )
}

export default CommentForm;