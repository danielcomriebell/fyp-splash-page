import Image from "next/image";
import Header from '../app/components/header'
import Waitlist from './components/hero' 


export default function Home() {
  return (
    <div className="header">
      <Header />
      <Waitlist />
    </div>
  );
}
