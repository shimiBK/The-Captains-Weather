import BeatLoader  from "react-spinners/BeatLoader";


const override = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)"
};

const Loading = () => {
  return (
    <div className="loading">
    <BeatLoader
    color="#22bdd6"
    loading
    size={20}
    cssOverride={override}
    speedMultiplier={2}
    />
</div>
  )
}

export default Loading