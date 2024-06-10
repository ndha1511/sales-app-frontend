import { useParams} from "react-router-dom";

const UpdateProduct = () => {
    const {id} = useParams();
    return <div>
        Update product
        {id}
    </div>
}

export default UpdateProduct;