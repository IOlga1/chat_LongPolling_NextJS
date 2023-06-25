import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

const HomePage = () => {
  const [newName, setNewName] = useState('');
  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newName) {
      alert('Empty "name" field')
      return
    }
    // Отправить соощение что такой чел присоединился
    router.push(`/${newName}`);
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <input placeholder="Your name" value={newName} onChange={(e) => { setNewName(e?.target.value) }} />
      <button type="submit">Go!</button>
    </form>
  );
};

export default HomePage;