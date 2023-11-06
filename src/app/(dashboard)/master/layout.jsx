import MasterDataNav from "@/components/MasterDataNav";

export default function MasterLayout({ children }) {
  return (
    <>
      <MasterDataNav />
      {children}
    </>
  )
}
