import React, { useEffect, useState } from "react";
import { UserAuth } from "../../context/AuthContext";
import { UserData } from "../../context/DataContext";
import requests from "../../request";
import Row from "../Row";
import Cards from "./cards";
import "./UserProfile.css";

function UserProfile() {
  const { user } = UserAuth();
  const { getUserData, updateStatus } = UserData();
  const [data, setData] = useState({});
  useEffect(() => {
    if (user) {
      getUserData(user.uid).then((res) => {
        setData(res);
      });
    }
  }, [user]);

  if (data.expireDate != null && data.lastPaymentDate != null) {
    let currentTime = Math.round(new Date().getTime() / 1000);
    if (data.expireDate < currentTime) {
      console.log("check of subscription is happing");
      updateStatus(user.uid);
    }
  }

  return (
    <div className=" mt-[-10em]">
      <div className="profile_container flex flex-row gap-80 my-0 ml-40 mb-20 ">
        <div>
          <img
            className="profile_avatar mb-20"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAjVBMVEUNfoD///8Ae30AeHoAdXcAdnl6q6z2+/vo8vLx+Ph1sbIAdHfu9PQHfH8AgYPl8vI7kJKRvr+hx8jO4+PJ3d4eioxppqja6eni7OxdoqRSnqC42dqXxsaw09Ntra8ph4l/uLmGtrdapqeozc02lZdMmZuuzM3A2NnU4+SRvL2fy8xSmZpEkZO+1NV1qaqNxlfBAAAEIElEQVR4nO3bXXeiOhQGYNgJg6AiiIiggtbP0U7//8+beJzjoCYtSAQ7630uetVmvZuEEOnWMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAvjNi3Ii8rkWtpuiLGCyKxA/dOchIZ3FPmGc5tVckGf4iPMUIA9/QGYNoEZr/c4Y+0zh2FSydX2KY00RfDDJ2ZlEnbadEa+EUYziBrlkkPzav2W4rJc5vYphzTQPTbYGixBZmkc/uYphDPTG29yObHb/p7YYSSQxzqSEGJbZs6FX9kavJQ1mMQV6/RDaVjWzaDU8i/ZDGMBf116knH1nH0FUoLrQ5qR2D3hQVhl0dwUvjihh2VHctsZVqaC3By6K1IoaZ1a2Qj5QXr68leznKpWQu6y5Tfv8wbKXC7HkV7hQjN1xh+rQKmeQkca6w0acFRaoKa9+HyosXci3Ry7Kk5w4de6lhKCps+nl4d+w+q/88VD0uHA3HpSpoLJ/ErH6FdHRkIw+b3GdOPOljK841DE2yvWaiYflXjLGWTKLtaolB9w8Me938uxq+uC8x0LMZUHRboqNh9T+QY3lb4ErXrUL92dXli6N23tPwt04xRsfV+MCi5O+Hl8Gy4W20EMMvXOrhRut1Jsrd+WQy2c82Wt9TVo7hpatY5FhlhvbXtsQsLmh/11w9x0vEAAAAAAAAAAAAAAAAgH8KMc/4l/8HRXyz3e2GLf07uqD/nO+fkLHZ2eeWgnZnkVi0ifSvJOLJpUXKTtoskfxdp9fZb7TWSETprtA50XCD3RWW/Qky19dUQCx3b7r2PV1jV+dd+sU6M88iDc0v1I2Cu5bextuzLqyrdrGgdhOHmL6xrGM/0hP3EfurIM42YY/fkMRYOpR2ZDvt3Yfe/iaLPVn4j7TBiL0l9xexooe24UbXIkvWL7n7uSGryh1JjEfjofQrQefV/7T8X2OuNFIvnq3FmisxlyR+zYoWo4Fi9oRB1kAhapbyytvT4OM9OpUpr1PUZhnR8SOYqosT4sxq99AmHvifxBuEo2G2iXiXc1bEeddYp8vtaN/55K9P9bntH0qJZV+kFHrh9HAI3P8sDodVqL7nCuzwrc0Wwr9YFEjbxGuy5+MWv1F+jcgPPr2XHtAL3l9j/v4Qny+CUguvHGfnvt7n3r44LSu+IFnVIDgarW8vUsSjmepQUnr24iB65dZZYt54NXi8vtEw9V64vDOx/fmHuPre6vSmWa6/r/s5xDls7W7D8lU64fZn6vFvUt4ZMcrfk2D69VnAmQbj95xefm3KiHMn73prN/g1CuO441zm1HacQRyHo19Btva6vMz5/JWd6jQ83z8mx48fZ8kx2fi5R9++tiKiPl1rOxEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALy43/ipMgzSotaqAAAAAElFTkSuQmCC"
            alt="Avator"
          />
        </div>
        <div className=" h-[11em] w-[25em] border-double rounded-lg border-4 border-inherit  text-center p-2">
          <div style={{ color: "white" }} className="font-bold text-2xl">Account details</div>
          <div style={{ color: "white" }} className="font-bold  mt-4">Name: {user?.displayName}</div>
          <div style={{ color: "white" }} className="font-bold">Email:  {user?.email}</div>
          {data?.status ? (
            <div style={{ color: "white" }} className="font-bold">status: true</div>
          ) : (
            <div style={{ color: "white" }} className="font-bold">Status: false</div>
          )}
           <div style={{ color: "white" }} className="font-bold">Current plan:  {data?.currentPlan} month</div>
        </div>
      </div>
      {data.status ? (
        <Row title={"Special for you"} fetchUrl={requests.fetchNetflixOriginals} isLarge={true}/>
      ) : (
        <div className="flex flex-row gap-10 my-0 ">
          <Cards months={1} />
          <Cards months={3} />
          <Cards months={6} />
        </div>
      )}
    </div>
  );
}

export default UserProfile;
