# Limi_Ai_Technical_Assessment
  Objective
The purpose of this implementation is to separate the main internal network and IoT devices from the guest network so that any kind of unauthorized access to the network can be prevented and security risks are mitigated. By isolating these environments, we ensure that a security breach in one segment (such as a vulnerable IoT sensor) does not grant an attacker access to sensitive corporate data or guest user information.

  Creating the VLAN (Layer 2 Segregation)
A separate VLAN (VLAN 20, named LIMI_IOT) is needed for IoT devices. This will be the wired setup of the organization, and specific interfaces of the switch (ports Gi0/1 through Gi0/8) will be configured as access ports for IoT devices, effectively locking them into their own broadcast domain. To bridge the wired and wireless segments, an interface (Gi0/24) will be configured as an 802.1Q Trunk. This trunk will allow tagged traffic from the IoT, Corporate, and Guest networks to reach the Wireless Access Point (WAP) over a single physical link.

  Wireless Connectivity and Gateway Services
For ensuring wireless connectivity, a dedicated SSID (LIMI-IOT-SECURE) will be mapped to VLAN 20, which will make sure that the wireless and wired devices are on the same logical network. To let the devices communicate beyond their own subnet, a Switched Virtual Interface (SVI) on the multilayer switch (or a sub-interface on a router) will be configured to act as the Default Gateway (IP 10.20.0.1) for all IoT devices.
As we are dealing with a high volume of IoT devices, using DHCP (Dynamic Host Configuration Protocol) will be efficient. A dedicated DHCP pool will be used to allocate IP addresses, subnet masks, and gateway information dynamically to the devices as they connect, eliminating the need for manual configuration.

  Security Rules (Access Control Lists)
To make sure that each network is separated, specifically the guest and IoT networks from the main internal one, we will configure Extended ACL rules. These rules will be applied to the Gateway interface to filter traffic based on source and destination IP addresses.
•	Traffic Filtering: The ACL will explicitly deny IoT devices from reaching the Corporate (192.168.10.0) and Guest (192.168.30.0) subnets.
•	Internet Access: A final rule will permit IoT devices to reach the Internet for cloud reporting and updates.
Only necessary devices and protocols will be allowed access; the rest will be denied. This will not only help in securing the network but will also improve the network flow and have a positive impact on bandwidth by reducing unnecessary broadcast traffic across segments.

  Conclusion
In conclusion, this multi-layered approach, combining VLAN segmentation, Trunking, and Access Control Lists, creates a robust security "sandbox" for IoT hardware. By terminating the IoT traffic at a secure Gateway and applying strict filtering rules, the organization successfully mitigates the risk of lateral movement. This design ensures that the network remains scalable and high-performing while maintaining a "Least Privilege" security posture across all departments.

