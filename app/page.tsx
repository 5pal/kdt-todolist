import Image from 'next/image';
import DeleteButton from '../public/images/deleteButton.svg';
export default function Home() {
    return (
        <main>
            <h1 className="font-nanumSquareBold text-[20px]">테스트 </h1>
            <DeleteButton />
            <Image
                src="/images/image.png"
                alt="image"
                width={100}
                height={100}
            />
        </main>
    );
}
