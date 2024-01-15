import { Share2 } from "lucide-react";
import { RWebShare } from "react-web-share";

const ShareButton = ({ title, text, url }: {
    title: string,
    text: string,
    url: string
}) => {
    return (
        <RWebShare
            data={{
                text: text,
                title: title,
                url: url,
            }}
        >
            <Share2 />
        </RWebShare>
    );
};
export default ShareButton;